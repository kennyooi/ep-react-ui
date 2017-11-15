import React, { Component } from 'react';

import TableProps from '../TableProps';
import { LazyImage } from '../../../src/index';


export default class DocLazyImage extends Component {

    render() {
        return (
            <div className="DocLazyImage">
                {this.renderSample()}
                {this.renderProps()}
            </div>
        );
    }

    renderSample() {
        return (
            <div className="doc-inview">
                <h2 className="page-subtitle">&lt;LazyImage /&gt;</h2>

                <p>Using <code>image</code> tag.</p>
                <div className="group">
                    <LazyImage
                        uniqId="image_1"
                        src="https://images.unsplash.com/photo-1493787039806-2edcbe808750?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                        width="839px"
                        height="559px"
                    />
                </div>
                <div className="group">
                    <LazyImage
                        uniqId="image_2"
                        src="https://images.unsplash.com/photo-1507980668227-a52aa457699b?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                        width="839px"
                        height="559px"
                    />
                </div>
                <div className="group">
                    <LazyImage
                        uniqId="image_3"
                        src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                        width="839px"
                        height="559px"
                    />
                </div>

                <p>Using <code>background-image</code> style.</p>
                <div className="group">
                    <LazyImage
                        uniqId="image_4"
                        src="https://images.unsplash.com/photo-1489753735160-2cbf3d9006d4?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                        width="839px"
                        height="559px"
                        useBg={true}
                    />
                </div>
                <div className="group">
                    <LazyImage
                        uniqId="image_5"
                        src="https://images.unsplash.com/photo-1497030855747-0fc424f89a4b?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                        width="839px"
                        height="559px"
                        useBg={true}
                    />
                </div>
            </div>
        );
    }

    renderProps() {
        return (
            <div className="group">
                <TableProps
                    dataset={[
                        {
                            name    : 'src',
                            type    : 'string',
                            desc    : 'Image source.'
                        },
                        {
                            name    : 'height',
                            type    : 'string',
                            desc    : 'Image height, must define in order to have correct height.'
                        },
                        {
                            name    : 'width',
                            type    : 'string',
                            desc    : 'Image width, must define in order to have correct width.'
                        },
                        {
                            name    : 'uniqId',
                            type    : 'string',
                            desc    : 'Unique ID for inview to work.'
                        },
                        {
                            name    : 'useBg',
                            type    : 'bool',
                            default : 'false',
                            desc    : (<div>Using <code>background-image</code> instead of <code>img</code> tag.</div>)
                        }
                    ]}
                />
            </div>
        );
    }
}