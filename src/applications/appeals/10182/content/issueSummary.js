import React from 'react';
import { Link } from 'react-router';

import formConfig from '../config/form';
import { getSelected } from '../utils/helpers';
import { ShowIssuesList } from '../components/ShowIssuesList';

export const SummaryTitle = ({ formData }) => {
  const { path } = formConfig.chapters.conditions.pages.contestableIssues;
  const issues = getSelected(formData);

  return (
    <p>
      Below is a list of the issues that you are requesting the Board to review.
      If an issue is missing, please{' '}
      <Link
        aria-label="go back and add any missing issues for review"
        to={{
          pathname: path,
          search: '?redirect',
        }}
      >
        go back and add it
      </Link>
      .{ShowIssuesList({ issues })}
    </p>
  );
};