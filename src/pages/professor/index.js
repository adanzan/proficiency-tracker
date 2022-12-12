//import StudentList from "../../components/StudentList"
import ProfessorView from "../../components/ProfessorView";
import UserHeader from "../../components/UserHeader";
import PropTypes from "prop-types";

export default function Professor({ instructor }) {
  return (
    <div>
      <UserHeader isStudent={instructor} />
      <ProfessorView />
    </div>
  );
}

Professor.propTypes = {
  instructor: PropTypes.bool.isRequired,
};
