import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
function Header({title, onClickAdd, showAddTask})
{

    return(
        <header className="header">
          <h1>{title}</h1>
          <Button title={showAddTask? 'Close' :'Add'} color={showAddTask? 'red' :'green'} onClick={onClickAdd} />
        </header>
    );
}
export default Header;

Header.defaultProps={
    title:'This is my Header default title',
}

Header.propTypes={
    title:PropTypes.string,
}
