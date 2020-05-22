import React, { FC } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    centered: {
      textAlign: "center",
    },
    thanksText: {
      fontStyle: "italic",
      marginTop: "2rem",
    },
  })
);

export const NotFoundPage: FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4" className={classes.centered}>
        404 | Well, That about Wraps It Up for This Page
      </Typography>
      <blockquote>
        <p>
          ’I refuse to prove that I exist,’ says Page, ’for proof denies faith,
          and without faith I am nothing.’
        </p>
        <p>
          ’But,’ says Man, ’The Babel fish is a dead giveaway, isn’t it? It
          could not have evolved by chance. It proves you exist, and so
          therefore, by your own arguments, you don’t. QED.’
        </p>
        <p>
          ’Oh dear,’ says Page, ’I hadn’t thought of that,’ and promptly
          disappears in a puff of logic.
        </p>
        <p className={classes.thanksText}>
          – Thanks to{" "}
          <Link
            href="https://www.elastic.co/de/whatever"
            target="_blank"
            rel="noopener"
          >
            {"https://www.elastic.co"}
          </Link>{" "}
          for this story
        </p>
      </blockquote>
    </div>
  );
};
