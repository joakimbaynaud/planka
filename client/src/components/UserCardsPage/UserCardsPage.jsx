import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Paths from '../../constants/Paths';
import DueDate from '../DueDate';
import HeaderContainer from '../../containers/HeaderContainer';

import styles from './UserCardsPage.module.scss';

function UserCardsPage({ currentUserId, currentUser, fetchBoard, projectsWithCards, isLoading }) {
  const [t] = useTranslation();

  useEffect(() => {
    if (projectsWithCards && projectsWithCards.length > 0) {
      projectsWithCards.forEach((project) => {
        if (project.boards && project.boards.length > 0) {
          project.boards.forEach((board) => {
            fetchBoard(board.id);
          });
        }
      });
    }
  }, [currentUserId, currentUser, projectsWithCards, fetchBoard]);

  if (isLoading) {
    return <Loader active size="massive" />;
  }

  return (
    <>
      <HeaderContainer />
      <div className={styles.container}>
        <h1 className={styles.title}>{t('common.myCards')}</h1>
        {projectsWithCards && projectsWithCards.length > 0 ? (
          <div className={styles.projectsContainer}>
            {projectsWithCards.map((project) => (
              <div key={project.id} className={styles.projectSection}>
                <h2 className={styles.projectTitle}>{project.name}</h2>

                {project.boards && project.boards.length > 0 ? (
                  project.boards.map((board) => (
                    <Link to={Paths.BOARDS.replace(':id', board.id)} key={board.id}>
                      <div className={styles.boardSection}>
                        <h3 className={styles.boardTitle}>{board.name}</h3>

                        {board.cards && board.cards.length > 0 ? (
                          <div className={styles.cardsGrid}>
                            {board.cards.map((card) => (
                              <div key={card.id} className={styles.card}>
                                <span className={styles.cardName}>{card.name}</span>
                                {card.dueDate && (
                                  <DueDate
                                    value={card.dueDate}
                                    size="medium"
                                    isCompleted={false}
                                    withStatusIcon
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className={styles.emptyMessage}>{t('common.noCards')}</p>
                        )}
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className={styles.emptyMessage}>{t('common.noBoards')}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>{t('common.noProjects')}</p>
          </div>
        )}
      </div>
    </>
  );
}

UserCardsPage.propTypes = {
  fetchBoard: PropTypes.func,
  currentUserId: PropTypes.string,
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    // Add any other properties that are in the currentUser object
  }),
  projectsWithCards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      boards: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          cards: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              dueDate: PropTypes.instanceOf(Date),
              // Add other card properties as needed
            }),
          ),
        }),
      ),
    }),
  ),
  isLoading: PropTypes.bool.isRequired,
};

UserCardsPage.defaultProps = {
  currentUserId: null,
  currentUser: null,
  projectsWithCards: [],
  fetchBoard: null,
};

export default UserCardsPage;
