import Link from 'next/link';
import styles from '@/src/styles/Pagination.module.scss';

export function Pagination({ totalCount }) {
  const PER_PAGE = 7;
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  console.log(totalCount);

  if (totalCount === undefined || totalCount <= 7 || PER_PAGE <= 0) {
    return null;
  }
    return (
      <ul className={styles.pagew_wrap}>
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
          <li key={index}>
            <Link href={`/blog/page/${number}`}>{number}</Link>
          </li>
        ))}
      </ul>
    );
}

import { Pagination } from '@/src/components/KurokoPagination';