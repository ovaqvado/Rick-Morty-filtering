import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useData } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);
      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [info, apiURL]);

  const pageClickHandler = useCallback(
    (index) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActivePage(index);
      setApiURL(pages[index]);
    },
    [setActivePage, setApiURL, pages]
  );

  const pageHandlers = useMemo(() => {
    return pages.map((_, idx) => () => pageClickHandler(idx));
  }, [pages, pageClickHandler]);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {pages[activePage - 1] && (
        <>
          {activePage - 1 !== 0 && (
            <>
              <Page onClick={pageHandlers[0]}>« First</Page>
              <Ellipsis>...</Ellipsis>
            </>
          )}

          <Page onClick={pageHandlers[activePage - 1]}>{activePage}</Page>
        </>
      )}

      <Page active>{activePage + 1}</Page>

      {pages[activePage + 1] && (
        <>
          <Page onClick={pageHandlers[activePage + 1]}>{activePage + 2}</Page>

          {activePage + 1 !== pages.length - 1 && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={pageHandlers[pages.length - 1]}>Last »</Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}
const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

// const Container = styled.div`
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   justify-items: center;
//   gap: 30px;
// `;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
