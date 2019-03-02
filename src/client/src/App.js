import React, { useState } from 'react';
import { Query } from 'react-apollo';

import GET_COUNTRIES from './queries/GET_COUNTRIES';

const App = props => {
  const [search, setSearch] = useState('');
  return (
    <div className="App">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Query query={GET_COUNTRIES} variables={{ search }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return data.countries.map(({ name, nativeName, region, flag }) => (
            <div key={name}>
              <img style={{ height: '50px' }} src={flag} alt={name} />
              <p>
                {nativeName} ({name}) is located in {region}.
              </p>
            </div>
          ));
        }}
      </Query>
    </div>
  );
};

export default App;
