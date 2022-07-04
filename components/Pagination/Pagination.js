import React from "react";
import { Pagination as PaginationSU } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";

const Pagination = (props) => {
  const { totalGames, page, limitPerPage } = props;
  const totalPages = Math.ceil(totalGames / limitPerPage);
  const router = useRouter();
  const urlParse = queryString.parseUrl(router.asPath);
  console.log(urlParse);
  const goToPaGe = (newPage) => {
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    router.push(url);
  };
  return (
    <div className="pagination">
      <PaginationSU
        defaultActivePage={page}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, data) => goToPaGe(data.activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
};

export default Pagination;