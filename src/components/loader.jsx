import React from 'react';

const styles = {
  outerContainer: {
    position: 'relative'
  },
  innerContainer: {
    position: 'absolute',
    height: '15em',
    top: '50%',
    marginTop: '-7.5em'
  }
};

function Loader() {
  return (
    <div className="mt-5 d-flex justify-content-center align-items-center">
      <div style={styles.innerContainer}>
        <svg width="151px" height="150px" viewBox="0 0 51 50">
          <rect y="0" width="13" height="50" fill="#1fa2ff">
            <animate
              attributeName="height"
              values="50;10;50"
              begin="0s"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              values="0;20;0"
              begin="0s"
              dur="1s"
              repeatCount="indefinite"
            />
          </rect>

          <rect x="19" y="0" width="13" height="50" fill="#12d8fa">
            <animate
              attributeName="height"
              values="50;10;50"
              begin="0.2s"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              values="0;20;0"
              begin="0.2s"
              dur="1s"
              repeatCount="indefinite"
            />
          </rect>

          <rect x="38" y="0" width="13" height="50" fill="#06ffcb">
            <animate
              attributeName="height"
              values="50;10;50"
              begin="0.4s"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              values="0;20;0"
              begin="0.4s"
              dur="1s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>
    </div>
  );
}

export default Loader;
