import React, { useState, useRef, useEffect, useCallback } from 'react';
import useIsMobile from '../../utils/hooks/useIsMobile';

const ReadMore = ({ children }) => {
    const [showReadMore, setShowReadMore] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef(null);
    const isMobile = useIsMobile();

    const handleClick = useCallback(() => {
        setIsExpanded((prevState) => !prevState);
    }, []);

    useEffect(() => {
        const contentElement = contentRef.current;
        if (contentElement) {
            setShowReadMore(contentElement.scrollHeight > contentElement.clientHeight);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentRef.current]);

    const readMoreStyle = (isExpanded || !isMobile)
        ? {}
        : {
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            display: '-webkit-box',
        };

    return (
        <div className="read-more-container">
            <section ref={contentRef} style={readMoreStyle}>
                {children}
            </section>
            {showReadMore && (
                <span onClick={handleClick} className="text-orange-500 underline">
                    Read {isExpanded ? 'Less' : 'More'}
                </span>
            )}
        </div>
    );
};

export default ReadMore;