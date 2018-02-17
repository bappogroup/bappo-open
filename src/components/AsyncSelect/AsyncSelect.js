// @flow

import * as React from 'react';
import { debounce } from 'lodash-es';
import Select from '../Select';
import type { Option } from '../Select/types.js.flow';

type RequiredProps = {
  loadOptions: (searchText: string) => ?Promise<Array<Option>>,
};
type OptionalProps = {
  autoLoad: ?boolean,
  loadingText: string,
  loadMoreOptions?: (searchText: string) => ?Promise<Array<Option>>,
  noResultsText?: string,
  onDropdownEndReached?: ?() => void,
  onInputChange?: ?(text: string) => void,
  searchPromptText: string,
};
export type Props = RequiredProps & OptionalProps;

type State = {
  inputValue: string,
  isLoading: boolean,
};

class AsyncSelect extends React.Component<Props, State> {
  static defaultProps = {
    autoLoad: true,
    loadingText: 'Loading...',
    searchPromptText: 'Type to search',
  };

  props: Props;

  focus = () => {
    this._select && this._select.focus();
  };

  state: State = {
    inputValue: '',
    isLoading: false,
  };

  componentDidMount() {
    const { autoLoad, loadOptions } = this.props;

    if (autoLoad) {
      this._load(loadOptions, '');
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
        onDropdownEndReached={this._onDropdownEndReached}
        noResultsText={this._getNoResultsText()}
        onInputChange={this._onInputChange}
      />
    );
  }

  _isLoading: ?boolean;
  _select: ?React.ElementRef<typeof Select>;

  _captureSelectRef = (ref: ?React.ElementRef<typeof Select>) => {
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

  _load = (loadFn: (searchText: string) => ?Promise<Array<Option>>, inputValue: string) => {
    this._isLoading = true;

    const callback = () => {
      this._isLoading = false;
      this.setState({ isLoading: false });
    };

    const promise = loadFn(inputValue);
    if (promise) {
      promise.then(callback, callback);
    }
  };

  _debouncedLoadOptions = debounce(this._load, 350);

  _onDropdownEndReached = () => {
    const { loadMoreOptions, onDropdownEndReached } = this.props;

    onDropdownEndReached && onDropdownEndReached();

    !this._isLoading && loadMoreOptions && this._load(loadMoreOptions, this.state.inputValue);
  };

  _onInputChange = (inputValue: string, triggeredByUser: boolean) => {
    const { loadOptions, onInputChange } = this.props;

    if (onInputChange) {
      onInputChange(inputValue);
    }

    this.setState({ inputValue });
    if (triggeredByUser) {
      this.setState({
        isLoading: true,
      });
      this._debouncedLoadOptions(loadOptions, inputValue);
    }

    return inputValue;
  };
}

export default AsyncSelect;
