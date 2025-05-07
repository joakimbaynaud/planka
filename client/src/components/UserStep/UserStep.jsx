import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selectors from '../../selectors/index';
import { Popup } from '../../lib/custom-ui';
import styles from './UserStep.module.scss';

const UserStep = React.memo(({ isLogouting, onSettingsClick, onLogout, onClose }) => {
  const [t] = useTranslation();
  const currentUserId = useSelector(selectors.selectCurrentUser).id;

  const handleSettingsClick = useCallback(() => {
    onSettingsClick();
    onClose();
  }, [onSettingsClick, onClose]);

  const handleCardsClick = useCallback(() => {
    onClose();
  }, [onClose]);

  let logoutMenuItemProps;
  if (isLogouting) {
    logoutMenuItemProps = {
      as: Button,
      fluid: true,
      basic: true,
      loading: true,
      disabled: true,
    };
  }

  return (
    <>
      <Popup.Header>
        {t('common.userActions', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <Menu secondary vertical className={styles.menu}>
          <Menu.Item className={styles.menuItem} onClick={handleSettingsClick}>
            {t('common.settings', {
              context: 'title',
            })}
          </Menu.Item>

          {/* Add the new menu item for My Cards */}
          <Menu.Item
            as={Link}
            to="/user-cards"
            className={styles.menuItem}
            onClick={handleCardsClick}
          >
            {t('common.myCards', {
              context: 'title',
            })}
          </Menu.Item>

          <Menu.Item
            {...logoutMenuItemProps} // eslint-disable-line react/jsx-props-no-spreading
            className={styles.menuItem}
            onClick={onLogout}
          >
            {t('action.logOut', {
              context: 'title',
            })}
          </Menu.Item>
        </Menu>
      </Popup.Content>
    </>
  );
});

UserStep.propTypes = {
  isLogouting: PropTypes.bool.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserStep;
