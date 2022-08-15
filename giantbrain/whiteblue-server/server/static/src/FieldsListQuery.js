import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import 'babel-polyfill';

import FieldsList from './FieldsList.js';

const GET_FIELDS = gql`{
  fields (limit : 3, offset : "jhskljfdljkffjlfkj"){
    pageInfoField{
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      
    }
    fields{
      _id
      fieldName
      description
    }
  }
}
`;

const FieldsListQuery = () => (
  <Query query={GET_FIELDS}>
    {({ data , loading, error, fetchMore }) => {
		if(loading) return (<div>Loading...</div>);
		if(error) return (<div>ERROR : {error.message}...</div>);
		return (<FieldsList 
					fields={data.fields.fields || []}
					onLoadMore={() =>
						fetchMore({
						  variables: {
							offset: data.fields.pageInfoField.endCursor,
							limit : 2
						  },
						updateQuery: (previousResult, { fetchMoreResult }) => {
						  const newFields = fetchMoreResult.fields.fields;
						  const pageInfoField = fetchMoreResult.fields.pageInfoField;

						  return newFields.length
							? {
								// Put the new comments at the end of the list and update `pageInfoField`
								// so we have the new `endCursor` and `hasNextPage` values
							   fields: {
								  __typename: previousResult.fields.__typename,
								  pageInfoField,
								  fields: [...previousResult.fields.fields, ...newFields]
								}
							  }
							: previousResult;
						}
					})
				  }
			/>);
	}
	}
  </Query>
);

export default FieldsListQuery;
