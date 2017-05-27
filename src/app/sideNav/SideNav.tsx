import "./SideNav.scss";

import * as React from "react";
import {FormattedMessage} from "react-intl";
import {match} from "react-router";
import {NavLink} from "react-router-dom";

function isActive(url: string) {
  return function (_match: match<any>, location: any): boolean {
    return location.pathname.startsWith(url);
  };
}

export default function SideNav() {
  return (
    <div className="side-nav">
      <nav>
        <ul>
          <li>
            <NavLink to="/tr0" activeClassName="selected">
              <span className="icon-container"><i className="fa fa-address-book" aria-hidden="true"/></span>
              <FormattedMessage id="sidenav.testRoute1" />
              {/*<span className="text-container">TestRoute1</span>*/}
            </NavLink>
          </li>
          <li>
            <NavLink to="/todo-list" activeClassName="selected">
              <span className="icon-container"><i className="fa fa-tasks" aria-hidden="true"/></span>
              <FormattedMessage id="sidenav.todos" />
              {/*<span className="text-container">Todo list</span>*/}
            </NavLink>
          </li>
          <li> {/* I'm not sure why the isActive stuff does not work out of the box for this link, but it seems we have to work around it. */}
            <NavLink to="/lazy-test/faq?bla=true" activeClassName="selected" isActive={isActive("/lazy-test")}>
              <span className="icon-container"><i className="fa fa-question-circle" aria-hidden="true"/></span>
              <FormattedMessage id="sidenav.testRoute3" />
              {/*<span className="text-container">TestRoute3</span>*/}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
