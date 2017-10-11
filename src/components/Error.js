import React from 'react'

var Error = ({error }) => (
  <div>
  { error === "" ?
    <div></div>
    :
    <div className="card text-white bg-danger ">
      <div className="card-body">
        <h4 className="card-title">
          Error
        </h4>
        {error}
      </div>
    </div>
  }
  </div>
);

export default Error
