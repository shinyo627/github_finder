import React, { useContext } from 'react';
import AlertConext from '../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertConext);
  const { alert } = alertContext;
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i> {alert.msg}
      </div>
    )
  );
};

export default Alert;
