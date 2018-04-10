import React from 'react';

export function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges( character => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
        );
    }, callback );
}

export const LinkComp = ({ children, contentState, entityKey }) => {
    const { url } = contentState.getEntity(entityKey).getData();
    return (
        <a href={url}>
            {children}
        </a>
    );
};