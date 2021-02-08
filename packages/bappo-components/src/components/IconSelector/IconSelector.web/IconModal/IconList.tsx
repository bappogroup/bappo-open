import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Icon from '../../../Icon';

export function IconList({
  onSelect,
  selectedIcons,
}: {
  onSelect: (selectedIcon: string) => void;
  selectedIcons: string[];
}) {
  const [count, setCount] = useState(144); // render 144 items only for super fast response time
  // then trigger second round of rendering for all itmes, that happens during thinking time
  useEffect(() => {
    const timeoutId = window.setTimeout(() => setCount(999999), 0);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: 145, overflowY: 'scroll' }}>
      {selectedIcons.slice(0, count).map((icon) => (
        <LinkOuter>
          <Link key={icon} onClick={() => onSelect(icon)}>
            <Icon name={icon} />
          </Link>
        </LinkOuter>
      ))}
    </div>
  );
}

const LinkOuter = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
`;

const Link = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;
