import React from 'react'

interface SpinnerProps {

}

export const Spinner: React.FC<SpinnerProps> = ({}) => {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
}