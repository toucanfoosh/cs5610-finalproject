import React from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from '../actions/theme-actions';
import '../index.css';
import '../nav-bar/index.css';

const ThemeSwitcher = ({ darkMode, toggleTheme }) => {
  const handleClick = () => {
    localStorage.setItem('darkMode', !darkMode);
    toggleTheme();
  };

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.style.setProperty('--primary', 'var(--primary-dark)');
      document.documentElement.style.setProperty('--secondary', 'var(--secondary-dark)');
      document.documentElement.style.setProperty('--tertiary', 'var(--tertiary-dark)');
      document.documentElement.style.setProperty('--tertiary-alt', 'var(--tertiary-alt-dark)');
    } else {
      document.documentElement.style.setProperty('--primary', 'var(--primary-light)');
      document.documentElement.style.setProperty('--secondary', 'var(--secondary-light)');
      document.documentElement.style.setProperty('--tertiary', 'var(--tertiary-light)');
      document.documentElement.style.setProperty('--tertiary-alt', 'var(--tertiary-alt-light)');
    }
  }, [darkMode]);

  return (
    <div onClick={handleClick}>
      <div className="list-group-item sf-clickable">
        <div className="justify-content-center justify-content-xl-none sf-navbar-item my-xl-0 my-3 mx-xl-4 py-2 py-xl-4">
          <div className="sf-secondary">
            <div className="row">
              <div className="text-center text-xl-end sf-tertiary col-xl-5">
                <span className={`fa-regular ${darkMode ? 'fa-sun' : 'fa-moon'} sf-secondary`}></span>
              </div>
              <div className="d-none d-xl-inline text-start col-xl-7">
                <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.theme.darkMode,
});

const mapDispatchToProps = {
  toggleTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher);
