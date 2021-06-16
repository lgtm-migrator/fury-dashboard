import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  EuiIcon,
  EuiBadge,
  EuiAvatar,
  EuiHeader,
  EuiButton,
  EuiSpacer,
  EuiSideNav,
  EuiHeaderLogo,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiEmptyPrompt,
  EuiHeaderBreadcrumbs,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
} from 'fury-design-system';
import reactToWebComponent from "react-to-webcomponent";


function Home() {
  return (
    <EuiEmptyPrompt
      iconType="home"
      title={<h2>Nested Component Homepage</h2>}
      body={
        <>
          <p>
            Navigators use massive amounts of spice to gain a limited form of
            prescience. This allows them to safely navigate interstellar space,
            enabling trade and travel throughout the galaxy.
          </p>
          <p>You&rsquo;ll need spice to rule Arrakis, young Atreides.</p>
        </>
      }
      actions={
        <EuiButton color="primary" fill>
          Home Action
        </EuiButton>
      }
    />
  );
}

function About() {
  return (
    <EuiEmptyPrompt
      iconType="editorStrike"
      title={<h2>About Page</h2>}
      body={
        <>
          <p>You&rsquo;ll need spice to rule Arrakis, young Atreides.</p>
        </>
      }
      actions={
        <EuiButton color="primary" fill>
          About Action
        </EuiButton>
      }
    />
  );
}

function Users() {
  return (
    <EuiEmptyPrompt
      iconType="user"
      title={<h2>User Page</h2>}
      body={
        <>
          <p>You&rsquo;ll need spice to rule Arrakis, young Atreides.</p>
        </>
      }
      actions={
        <EuiButton color="primary" fill>
          User Action
        </EuiButton>
      }
    />
  );
}

let basePath: string = '/';

const SideNav = () => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState('Time stuff');

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name: string) => {
    setSelectedItem(name);
  };

  const createItem = (name: string, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      id: `test-id${Math.random()}`,
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const sideNav = [
    createItem('Elasticsearch', {
      onClick: undefined,
      icon: <EuiIcon type="logoElasticsearch" />,
      items: [
        createItem('Data sources', {children: <Home />}),
        createItem('Users'),
        createItem('Roles'),
        createItem('Watches'),
        createItem(
          'Extremely long title will become truncated when the browser is narrow enough'
        ),
      ],
    }),
    createItem('Kibana', {
      onClick: undefined,
      icon: <EuiIcon type="logoKibana" />,
      items: [
        createItem('Advanced settings', {
          items: [
            createItem('General', { disabled: true }),
            createItem('Timelion', {
              items: [
                createItem('Time stuff', {
                  icon: <EuiIcon type="clock" />,
                }),
                createItem('Lion stuff', {
                  icon: <EuiIcon type="stats" />,
                }),
              ],
            }),
            createItem('Visualizations'),
          ],
        }),
        createItem('Index Patterns'),
        createItem('Saved Objects'),
        createItem('Reporting'),
      ],
    }),
    createItem('Logstash', {
      onClick: undefined,
      icon: <EuiIcon type="logoLogstash" />,
      items: [createItem('Pipeline viewer')],
    }),
  ];

  
  return (
    <EuiSideNav
      aria-label="Complex example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
      style={{ width: 192 }}
    />
  );
};

export function NavPoc() {
  // useEffect(() => {
    // TODO: take this from a config for remote components
    basePath = '/sample';
  // }, [])
  
  return (
    <Router>
      <div>
      <EuiHeader >
        <EuiHeaderSectionItem>
          <EuiHeaderLinks aria-label="App navigation links example">
            <EuiHeaderLink href={`${basePath}/`}>Sample Component</EuiHeaderLink>
            <EuiHeaderLink href={`${basePath}/about`}>About</EuiHeaderLink>
            <EuiHeaderLink href={`${basePath}/sample`}>Sample</EuiHeaderLink>
            <EuiHeaderLink href={`${basePath}/users`}>Users</EuiHeaderLink>
          </EuiHeaderLinks>
        </EuiHeaderSectionItem>
      </EuiHeader>
      <EuiSpacer size="xxl" />
      {/* <SideNav /> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path={`${basePath}/about`}>
            <About />
          </Route>
          <Route path={`${basePath}/sample`}>
            <EuiEmptyPrompt
              iconType="editorStrike"
              title={<h2>Sample Page</h2>}
              body={
                <>
                  <p>Look at the routes!</p>
                </>
              }
              actions={
                <EuiButton color="primary" fill>
                  Sample Action
                </EuiButton>
              }
            />
          </Route>
          <Route path={`${basePath}/users`} render={() => <Users />} />

          <Route path={`${basePath}/`}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const NavComponent: CustomElementConstructor = reactToWebComponent(NavPoc, React, ReactDOM);

export default NavComponent;