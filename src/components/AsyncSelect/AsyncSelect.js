// @flow

import * as React from 'react';
import { debounce } from 'lodash';
import Select from '../Select';
import type { Option } from '../Select/types.js.flow';

type RequiredProps = {
  loadOptions: (searchText: string) => ?Promise<Array<Option>>,
};
type OptionalProps = {
  autoLoad: ?boolean,
  loadingText: string,
  noResultsText?: string,
  onInputChange?: ?(text: string) => void,
  searchPromptText: string,
};
export type Props = RequiredProps & OptionalProps;

type State = {
  inputValue: string,
  isLoading: boolean,
};

class AsyncSelect extends React.Component<Props, State> {
  props: Props;

  focus = () => {
    this._select && this._select.focus();
  };

  static defaultProps = {
    autoLoad: true,
    loadingText: 'Loading...',
    searchPromptText: 'Type to search',
  };

  state: State = {
    inputValue: '',
    isLoading: false,
  };

  componentDidMount() {
    const { autoLoad } = this.props;

    if (autoLoad) {
      this._loadOptions('');
    }
  }

  render() {
    const {
      autoLoad,
      loadOptions,
      loadingText,
      searchPromptText,
      ...selectProps
    } = this.props;
    const { isLoading } = this.state;

    return (
      <Select
        {...selectProps}
        ref={this._captureSelectRef}
        isLoading={isLoading}
        noResultsText={this._getNoResultsText()}
        onInputChange={this._onInputChange}
      />
    );
  }

  _select = (null: any);

  _captureSelectRef = (ref: any) => {
    this._select = ref;
  };

  _getNoResultsText = () => {
    const { loadingText, noResultsText, searchPromptText } = this.props;
    const { inputValue, isLoading } = this.state;

    if (isLoading) {
      return loadingText;
    } else if (inputValue && noResultsText) {
      return noResultsText;
    }
    return searchPromptText;
  };

  _loadOptions = (inputValue: string) => {
    const { loadOptions } = this.props;

    const callback = () => {
      this.setState({ isLoading: false });
    };

    const promise = loadOptions(inputValue);
    if (promise) {
      promise.then(callback, callback);
    }
  };

  _debouncedLoadOptions = debounce(this._loadOptions, 350);

  _onInputChange = (inputValue: string, triggeredByUser: boolean) => {
    const { onInputChange } = this.props;

    if (onInputChange) {
      onInputChange(inputValue);
    }

    this.setState({ inputValue });
    if (triggeredByUser) {
      this.setState({
        isLoading: true,
      });
      this._debouncedLoadOptions(inputValue);
    }

    return inputValue;
  };
}

export default AsyncSelect;
