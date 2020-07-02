"use strict";

const yaml = require("js-yaml");
const _ = require("lodash");

const utils = require("../util/fileUtils");

const defaultOpts = {
  verbose: false,
  duplicateThreshold: 5,
  format: "ts",
  splitPerLang: false,
};

const parseYaml = (file) => {
  try {
    return yaml.safeLoad(file.contents);
  } catch (e) {
    if (e.name === "YAMLException") {
      throw new Error(
        `Error parsing ${file.path}: [${e.mark.line}:${e.mark.column}] ${e.reason}`
      );
    } else {
      throw e;
    }
  }
};

const mapLeaves = (obj, iteratee, path) => {
  path = path || [];
  return _.flatMap(obj, (value, key) => {
    if (_.isObject(value)) {
      return mapLeaves(value, iteratee, path.concat(key));
    } else {
      return iteratee(value, path.concat(key));
    }
  });
};

const setValueAt = (obj, path, value) => {
  obj[path] = value;
};

const statistics = (opts) => (partials) => {
  const translations = _.flatMap(partials, (partial) =>
    mapLeaves(partial.translations, (value, path) => ({
      value,
      key: path.join("."),
      file: partial.path,
      lang: _.last(path),
    }))
  );

  const duplicatedValues = _.chain(translations)
    .filter(
      (translation) =>
        _.filter(
          translations,
          (t) => translation.value === t.value && translation.lang === t.lang
        ).length > 1
    )
    .groupBy("value")
    .value();

  let duplicatedKeys = _.filter(
    translations,
    (translation) =>
      _.filter(translations, (t) => translation.key === t.key).length > 1
  );

  const conflictingKeys = _.chain(duplicatedKeys)
    .filter((translation) =>
      _.some(
        duplicatedKeys,
        (t) => translation.key === t.key && translation.value !== t.value
      )
    )
    .groupBy("key")
    .value();
  duplicatedKeys = _.groupBy(duplicatedKeys, "key");

  if (translations.length > 0) {
    const maxFileNameLength = _.maxBy(translations, (t) => t.file.length).file
      .length;

    if (_.size(conflictingKeys) > 0) {
      _.each(conflictingKeys, (translations, key) => {
        console.error(`Conflict for "${key}":`);
        _.each(translations, (t) => {
          console.error(
            `${_.padEnd(`${t.file} `, maxFileNameLength + 2, "-")}> ${t.value}`
          );
        });
      });
      return Promise.reject(
        new Error(`Translation failed: Conflicting translations.`)
      );
    }
    if (opts.verbose) {
      _.each(duplicatedValues, (translations, value) => {
        console.debug(`Duplicated value for "${value}":`);
        _.each(translations, (t) => {
          console.debug(
            `${_.padEnd(`${t.file} `, maxFileNameLength + 2, "-")}> ${t.key}`
          );
        });
      });
    }

    const duplicatedValuesPercent =
      (_.size(duplicatedValues) / translations.length) * 100;
    if (!_.isUndefined(opts.duplicateThreshold)) {
      if (duplicatedValuesPercent > opts.duplicateThreshold) {
        return Promise.reject(
          new Error(
            `Translation failed: Too may duplicates: ${_.size(
              duplicatedValues
            )} (${duplicatedValuesPercent.toFixed(1)}%)`
          )
        );
      }
    }
    console.debug(
      `Translation duplicates: ${_.size(
        duplicatedValues
      )} (${duplicatedValuesPercent.toFixed(1)}%)`
    );
  } else {
    console.debug(`Translation duplicates: 0 / 0%; There are no translations!`);
  }
  return partials;
};

const byLanguage = (translations) => {
  const result = {};
  mapLeaves(translations, (value, path) => {
    const lang = path.pop();
    result[lang] = result[lang] || {};
    setValueAt(result[lang], path.join("."), value);
  });
  return result;
};

const formatters = {
  ts(translations) {
    return `export default ${JSON.stringify(translations, null, 4)};\n`;
  },
  json(translations) {
    return JSON.stringify(translations, null, 4);
  },
};

/**
 * Function to compile a set of translations in .yml format to a typescript file.
 *
 * @param src The files to pick up for compilation. In most cases, this is a glob.
 * @param dest The destination file.
 * @param opts Specific build options. Atm., the following are supported:
 *             "verbose": Log some additional information.
 *             "duplicateThreshold": Limit the allowed translation duplication (in percent).
 */
exports.compile = (src, dest, opts) => {
  opts = _.defaults(opts, { ...defaultOpts });

  // Determine output format / file extension.
  if (!(opts.format in formatters)) {
    console.warn(
      `Output format=${opts.format} is not supported. Falling back to 'ts'.`
    );
    opts.format = "ts";
  }

  return utils
    .getFiles(src)
    .then((paths) =>
      Promise.all(
        paths.map((path) =>
          utils.readFile(path).then((contents) => ({ contents, path }))
        )
      )
    )
    .then((files) =>
      Promise.all(
        files.map((file) => ({
          path: file.path,
          translations: parseYaml(file),
        }))
      )
    )
    .then(statistics(_.pick(opts, "verbose", "duplicateThreshold")))
    .then((partials) =>
      _.defaultsDeep.apply(_, _.map(partials, "translations"))
    )
    .then(byLanguage)
    .then((translations) => {
      if (opts.splitPerLang) {
        const data = Object.keys(translations).map((lang) => {
          const formatted = formatters[opts.format](translations[lang]);
          const target = `${dest}-${lang}.${opts.format}`;
          return utils.writeFile(target, formatted);
        });
        return Promise.all(data);
      } else {
        dest = `${dest}.${opts.format}`;
        const formatted = formatters[opts.format](translations);
        return utils.writeFile(dest, formatted);
      }
    });
};

/**
 * Creates a watcher for compiling the translations on every change to them.
 * Note that incremental builds are not possible, so it will simply execute the
 * `compile` function above.
 *
 * @param src The files to pick up for compilation. In most cases, this is a glob.
 * @param dest The destination file.
 * @param opts Specific build options. Atm., the following are supported:
 *             "verbose": Log some additional information.
 *             "duplicateThreshold": Limit the allowed translation duplication (in percent).
 *             "chokidarOpts": Options to be forwarded to chokidar.
 * @return The watcher created by `chokidar`.
 */
exports.watch = (src, dest, opts) => {
  opts = _.defaults(opts, { ...defaultOpts });
  const watch = require("./translations/watch");
  return watch(
    src,
    () => {
      exports.compile(src, dest, opts).then(
        () => console.debug(`Translations written to ${dest}`),
        (err) => console.error(`Error processing translation: ${err}`)
      );
    },
    {
      events: ["change", "unlink"],
      chokidarOpts: opts.chokidarOpts,
    }
  );
};
