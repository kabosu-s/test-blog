import Link from 'next/link';
import styles from '@/src/styles/Pagination.module.scss';
import { useRouter } from 'next/router';


export default function Pagination({ totalPages }) {
  // ページネーションリンクを生成
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const router = useRouter();
  const currentPage = parseInt(router.query.page, 10) || 1; 
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`/notice?page=${currentPage - 1}`}>
          前のページ
        </Link>
      )}

      {pages.map((page) => (

      <Link key={page} href={`/notice?page=${page}`} className={currentPage === page ? 'active' : ''}>
      {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={`/notice?page=${currentPage + 1}`}>
        次のページ
        </Link>
      )}
    </div>
  );
}