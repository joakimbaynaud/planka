import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import selectors from '../selectors';
import entryActions from '../entry-actions';
import UserCardsPage from '../components/UserCardsPage';

const mapStateToProps = (state) => {
  const currentUserId = selectors.selectCurrentUserId(state);
  const currentUser = selectors.selectCurrentUser(state);
  const projectsWithCards = selectors.selectProjectsToCardsForCurrentUser(state);

  return {
    currentUserId,
    currentUser,
    projectsWithCards,
    isLoading: !currentUserId || !projectsWithCards,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchBoard: entryActions.fetchBoard,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserCardsPage);
