import { CSSTransition } from 'react-transition-group';
import appearStyles from '../../transitionsStyles/appear.module.css';
import PropTypes from 'prop-types';

const Title = ({ title, level = 1 }) => {
  const TagNameTitle = `h${level}`;
  return (
      <CSSTransition in ={true} appear={true} timeout={500} classNames={appearStyles} unmountOnExit>
          <TagNameTitle style={{color: 'cornflowerblue'}}>{title}</TagNameTitle>
      </CSSTransition>
    )
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

export default Title;
