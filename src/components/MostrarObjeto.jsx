import React from "react";

function MostrarObjeto({ data }) {
  return (
    <div className="object-container">
      {Array.isArray(data) ? (
        data.map((item, index) => (
          <div key={index} className="object-item">
            {Object.entries(item).map(([key, value]) => (
              <p key={key} className="key-value-pair">
                <span className="key">{key}:</span> {value}
              </p>
            ))}
          </div>
        ))
      ) : (
        <div className="object-item">
          {Object.entries(data).map(([key, value]) => (
            <p key={key} className="key-value-pair">
              <span className="key">{key}:</span> {value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default MostrarObjeto;
