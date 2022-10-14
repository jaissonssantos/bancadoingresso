import React from 'react';

export const convertToClassComponent = <T extends unknown>(
  FunctionalComponent: React.FC,
): React.ComponentClass<T> =>
  class extends React.Component<T> {
    render(): React.ReactNode {
      return <FunctionalComponent {...this.props} />;
    }
  };
