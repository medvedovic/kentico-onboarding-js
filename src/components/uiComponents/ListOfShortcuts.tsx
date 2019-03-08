import * as React from 'react';

export const ListOfShortcuts: React.StatelessComponent = () => {
  return (
    <section className="shortcuts">
      <h3>List of shortcuts</h3>
      <ul>
        <li><code>alt + n</code>Focus main input</li>
        <li><code>escape</code>Cancel</li>
      </ul>
      <p>More to be added...</p>
    </section>
  );
};
