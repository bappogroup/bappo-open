/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
declare const ImageLoader: {
    abort(requestId: number): void;
    getSize(uri: string, success: (height: number, width: number) => any, failure: () => any): void;
    load(uri: string, onLoad: (image: any) => any, onError: Function): number;
    prefetch(uri: string): Promise<any>;
};
export default ImageLoader;
