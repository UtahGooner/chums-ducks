import React from 'react';
import classNames from "classnames";

export interface Props {
    color: string,
    pill?: boolean,
    text?: string,
    className?: string | object,
    description?: string,
}

const Badge: React.FC<Props> = ({
                                    color,
                                    pill,
                                    text,
                                    className,
                                    description,
                                    children
                                }) => {
    const _className = {
        'badge': true,
        'badge-pill': pill,
        [`bg-${color}`]: !!color,
    }

    return (
        <span className={classNames(_className, className)}>
            {text || children || ''}
            {!!description && (<span className="visually-hidden">{description}</span>)}
        </span>
    )
};

export default Badge;
