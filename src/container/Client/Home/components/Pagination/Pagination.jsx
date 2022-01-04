import React from 'react'
import styles from './Pagination.module.css'

function Pagination(props) {
  const { pagination, totalPages, onPageChange } = props;
  const { page } = pagination;

  const handleChangePage = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage)
    }
  }

  return (
    <div style={{ backgroundColor: '#001232' }}>
      <nav className={styles.Pagination}>
        <ul className={styles.Paginate}>
          <li className={styles.Page_Item}>
            <button disabled={page === 1} className={page <= 1 ? styles.Btn_Disable : styles.Btn_Grad} onClick={() => handleChangePage(page - 1)}>
              {'<< Prev'}
            </button>
          </li>
          <li className={`${styles.Page_Item} ${styles.D_Flex} ${styles.Middle_Text}`}>
            Page {page}/{totalPages}
          </li>
          <li className={styles.Page_Item}>
            <button disabled={page === totalPages} className={page >= totalPages ? styles.Btn_Disable : styles.Btn_Grad} onClick={() => handleChangePage(page + 1)}>
              {'Next >>'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
