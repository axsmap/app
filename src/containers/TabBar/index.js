import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setFilters } from "../VenuesPage/actions";
import makeSelectApp from "../App/selector";
import TabBarComp from "../../components/TabBar";

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectApp("isAuthenticated"),
  userData: makeSelectApp("userData"),
});

const mapDispatchToProps = (dispatch) => ({
  showFilters: () => {
    dispatch(setFilters("visible", true));
  },
});

const TabBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBarComp);

export default TabBar;
