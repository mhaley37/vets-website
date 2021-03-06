import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import get from 'platform/utilities/data/get';
import set from 'platform/utilities/data/set';
import classNames from 'classnames';

import scrollToTop from 'platform/utilities/ui/scrollToTop';
import ProgressButton from 'platform/forms-system/src/js/components/ProgressButton';
import SchemaForm from 'platform/forms-system/src/js/components/SchemaForm';
import { setData, uploadFile } from 'platform/forms-system/src/js/actions';
import { getNextPagePath } from 'platform/forms-system/src/js/routing';
import { focusElement } from 'platform/forms-system/src/js/utilities/ui';

function focusForm() {
  focusElement('.nav-header');
}

class FormPage extends React.Component {
  componentDidMount() {
    if (!this.props.blockScrollOnMount) {
      scrollToTop('topScrollElement', window.Forms?.scroll || '');
      focusForm();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.route.pageConfig.pageKey !==
        this.props.route.pageConfig.pageKey ||
      get('params.index', prevProps) !== get('params.index', this.props)
    ) {
      scrollToTop();
      focusForm();
    }
  }

  onChange = formData => {
    let newData = formData;
    if (this.props.route.pageConfig.showPagePerItem) {
      // If this is a per item page, the formData object will have data for a particular
      // row in an array, so we need to update the full form data object and then call setData
      newData = set(
        [this.props.route.pageConfig.arrayPath, this.props.params.index],
        formData,
        this.props.form.data,
      );
    }
    this.props.setData(newData);
  };

  onSubmit = ({ formData }) => {
    const { form, params, route, location } = this.props;

    // This makes sure defaulted data on a page with no changes is saved
    // Probably safe to do this for regular pages, too, but it hasn’t been necessary
    if (route.pageConfig.showPagePerItem) {
      const newData = set(
        [route.pageConfig.arrayPath, params.index],
        formData,
        form.data,
      );
      this.props.setData(newData);
    }

    const path = getNextPagePath(route.pageList, form.data, location.pathname);

    this.props.router.push(path);
  };

  goBack = () => {
    const formPageUrl = window.location.pathname;
    let introductionPageUrl = formPageUrl.split('/');
    introductionPageUrl.splice(-2);
    introductionPageUrl = introductionPageUrl.join('/');
    window.location.replace(`${introductionPageUrl}`);
  };

  render() {
    const {
      route,
      params,
      form,
      contentBeforeButtons,
      contentAfterButtons,
      formContext,
    } = this.props;

    let { schema, uiSchema } = form.pages[route.pageConfig.pageKey];

    const pageClasses = classNames('form-panel', route.pageConfig.pageClass);
    let data = form.data;

    if (route.pageConfig.showPagePerItem) {
      // Instead of passing through the schema/uiSchema to SchemaForm, the
      // current item schema for the array at arrayPath is pulled out of the page state and passed
      schema =
        schema.properties[route.pageConfig.arrayPath].items[params.index];
      // Similarly, the items uiSchema and the data for just that particular item are passed
      uiSchema = uiSchema[route.pageConfig.arrayPath].items;
      // And the data should be for just the item in the array
      data = get([route.pageConfig.arrayPath, params.index], data);
    }

    return (
      <div className={pageClasses}>
        <SchemaForm
          name={route.pageConfig.pageKey}
          title={route.pageConfig.title}
          data={data}
          schema={schema}
          uiSchema={uiSchema}
          pagePerItemIndex={params ? params.index : undefined}
          formContext={formContext}
          uploadFile={this.props.uploadFile}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        >
          {contentBeforeButtons}
          <div className="row form-progress-buttons schemaform-buttons">
            <div className="small-6 medium-5 columns">
              <ProgressButton
                onButtonClick={this.goBack}
                buttonText="Back"
                buttonClass="usa-button-secondary"
                beforeText="«"
              />
            </div>
            <div className="small-6 medium-5 end columns">
              <ProgressButton
                submitButton
                buttonText="Continue"
                buttonClass="usa-button-primary"
                afterText="»"
              />
            </div>
          </div>
          {contentAfterButtons}
        </SchemaForm>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    form: state.form,
    user: state.user,
  };
}

const mapDispatchToProps = {
  setData,
  uploadFile,
};

FormPage.propTypes = {
  form: PropTypes.object.isRequired,
  route: PropTypes.shape({
    pageConfig: PropTypes.shape({
      pageKey: PropTypes.string.isRequired,
      schema: PropTypes.object.isRequired,
      uiSchema: PropTypes.object.isRequired,
    }),
    pageList: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
      }),
    ),
  }),
  contentBeforeButtons: PropTypes.element,
  contentAfterButtons: PropTypes.element,
  setData: PropTypes.func,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FormPage),
);

export { FormPage };
