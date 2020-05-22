import React, { FC, MouseEvent, useState } from "react";
import { useIntl } from "react-intl";
import Fab from "@material-ui/core/Fab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LanguageIcon from "@material-ui/icons/Language";

import { getSupportedLanguages } from "../i18n/i18n";
import { useIntlConfig } from "../provider/IntlConfigProvider";

const LanguagePicker: FC = () => {
  const languages = getSupportedLanguages();

  const { formatMessage, locale } = useIntl();
  const { loadLanguage } = useIntlConfig();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const listItems = languages.map((lang) => (
    <MenuItem
      key={lang}
      onClick={() => {
        handleClose();
        loadLanguage(lang);
      }}
      selected={lang === locale}
    >
      {formatMessage({ id: `languages.${lang}` })}
    </MenuItem>
  ));

  return (
    <div>
      <Fab
        aria-controls="language-selection"
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
      >
        <LanguageIcon />
      </Fab>
      <Menu
        id="language-selection"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {listItems}
      </Menu>
    </div>
  );
};

export default LanguagePicker;
