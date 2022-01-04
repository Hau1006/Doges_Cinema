import { Select } from "antd";
import React from "react";
import styles from "./FilterBox.module.css";

function FilterBox(props) {
  const { movieList } = props;
  // const dispatch = useDispatch();
  // const movieTicket = useSelector(selectMovieTicket);
  const { Option } = Select;
  // const [movieOptionList, setmovieOptionList] = useState([]);

  // const handleChange = (e) => {
  //   const movieID = e.target.value;
  // }

  const renderMovieList = movieList?.map((movie) => {
    return (
      <Option key={movie.maPhim} value={movie.maPhim}>
        {movie.tenPhim}
      </Option>
    );
  });

  return (
    <div className={`${styles.Search} ${styles.Container_lg} ${styles.p_0}`}>
      <div className={styles.Content}>
        <div className={styles.Header}>
          <div className={styles.Row}>
            <div className={styles.Col_9}>
              <div className={styles.Category}>WELCOME TO MOVIE TICKET</div>
              <div className={styles.Title}>WHAT ARE YOU LOOKING FOR</div>
            </div>
            <div className={`${styles.Col_3} ${styles.Text_Right}`}>
              <button className={styles.Btn_Gradient}>PROCEED</button>
            </div>
          </div>
        </div>
        <div className={styles.Bottom}>
          <form className={styles.SearchForm}>
            <div className={styles.Row}>
              <div
                className={`${styles.Col_Lg_3} ${styles.Col_Sm_6} ${styles.Col_Md_6} `}
              >
                <span>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAApCAYAAAC2qTBFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA9NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YWFmZDM1NzktMWZiMS02YjQxLTlkZDgtOTViMmM2MTJkOThiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMwMjg4REUzMTlGMzExRUE5NUZEQzEzNzEyMUZCQ0NGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMwMjg4REUyMTlGMzExRUE5NUZEQzEzNzEyMUZCQ0NGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE2MjNkZDdjLTUzNjItMDE0Mi1iNWY4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"
                    alt="movie"
                  />
                </span>
                <span className={styles.Type}>Movie</span>
                <Select defaultValue={"Movie"} className={styles.Select}>
                  <Option disabled selected>
                    Choose Movie
                  </Option>
                  {renderMovieList}
                </Select>
              </div>
              <div
                className={`${styles.Col_Lg_3} ${styles.Col_Sm_6} ${styles.Col_Md_6} ${styles.Mt_Sm_0}`}
              >
                <span>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA9NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YWFmZDM1NzktMWZiMS02YjQxLTlkZDgtOTViMmM2MTJkOThiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ3QTA2MjBFMTlGMzExRUE5NzQ5QjdCQzNBNzg2MTYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3QTA2MjBEMTlGMzExRUE5NzQ5QjdCQzNBNzg2MTYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE2MjNkZDdjLTUzNjItMDE0Mi1iNWY4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"
                    alt="theater"
                  />
                </span>
                <span className={styles.Type}>Theater</span>
                <Select defaultValue={"Theater"} className={styles.Select}>
                  <Option disabled selected>
                    Choose Theater
                  </Option>
                </Select>
              </div>
              <div
                className={`${styles.Col_Lg_3} ${styles.Col_Sm_6} ${styles.Col_Md_6}`}
              >
                <span>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA9NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YWFmZDM1NzktMWZiMS02YjQxLTlkZDgtOTViMmM2MTJkOThiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk2MTg1NUY3MTlGMzExRUE5RjVFRjVBNTNBM0RDNjQwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk2MTg1NUY2MTlGMzExRUE5RjVFRjVBNTNBM0RDNjQwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE2MjNkZDdjLTUzNjItMDE0Mi1iNWY4LTY5MWFmNWJlOGVmZSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMxYTAxMDk3LTRjN2UtZTU0NC04MmQ1LTVhMjM4MTE1ZjAwOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrOqP3MAAAfoSURBVHjaxFhbbFzFGf5n5pyzF+/axtgmAZoLCIjVJkFxpDgifaGkTZu0laBVQTzRB6QKqUh9qqr2GV6K2pcWVarUlhZKW6y2iVQCaVK1oOASx3ZoDElsQkgpOCaJL2vvnnPmzPSbOWe9l+zaWZOEkX6dnT1z+ea/fP8/h9Eq2r1fPZrF43HIg5BNkE6IWzdMQi5DTkP+BPnF6P6di63uxVoEdj8ez0A2Q3iLe2nIW5DvAejfrylAANuKxyDkDro27T2jfQAdWWkgvwpwv8Jj5BqCM20DZBhr/3bVGsTkdjzGksWuZztntoM2Z64aIMDdhsd/Eue/EW3W+DVAnl8RYKK5czcQXDXIDfWabOSDo58CONM6kr2bB0kSEBvp02vr6wOH1VHJSL3ZtdakVRAPZg4xLlaxr6ZIloiLNNZgK4zztVLBfScPfumo+cepejvYyCeD0iVa3CJpfi8jLQxI3iq/xxwdKuo6ICk3mW8+SisK/Vkm3Owf0b19CSC094VGPKeVtFLcxkh2l/9Vq7afOWhu8mqyB7vNYDIZp6zBHzceyY3KiE8UyZuRyeT4v9YUCDfBwfiFbCuzTErdypLEP98sq0SySJenjsPUM584AjK5tXTTLdush5x5co78myVt+HU75Sac5BwR+Ysfk+O2kePlTO7OOUlVwss+wMzsKg0JJ2M16Tgu9X1211LgnJgap8V9uyubH3iFivu+WOm/fJiKe+5f6rf95g+kBFwljUCDNktrItQ7moq3yyWADTj6cQPsoeqACIO5xtauAm1+M7duUa+22tIpr36ByraKkXeR2dhpm3SWU/o3DMB7an1FN3LaK6cqvUK/eTD53TBlW0CaQ5O90XIA73aWyxrG5DKYxeE1SRnSe2dPWO0pFRFbmKXMq/8gbbQZKRL/+4gyrxzBppwYDir++yFlDh4GNQmrKRaGRNn4oGEn5oeRHcuDZQuqTqdBJVxDMyoKrWaV69LUnl3WRDqKKHPkdfIH+q3pwKyUOfQvKg1sh7syq8108XUq7TR9buebA3CH2/e5DzLEQ02sxCh/Km1CsRkEt6kDqCiw7L/UHEEqn6u8b8uiXyFdncuSbs8vOYgZq9vbKw7DK5qa37iAM0CDKU1hhyQx3Zy2mgIMgwI0E66Qmlqlw4gCBOFiftHwlwXt6znivibXzTXkV6c5m9eGC/MD8o6fiBeROPXUx+iPxWQOk3PTH0YxYnI1TC4++JC8Y+hbH4Q5MQcnJi19uqcroNMLRGnNqCfv0xzoRokUpnoNAYbN/FBuuoN0VydFb0yTni6QurkzBhgiBcI7VNdNAMQsQO2KuC+49UFDM3a8AWgiHPOijg6S2zZTz53v0JZ1Ps6m6I0hU2U1TQKhkxSK3VdkkDXdJD93d+xPhtMASK5fVznZu+dIbqj03TNnSW5cX3l/9n30K7cFLYYAOkWqt5vae4pW8ablB7qoMDTftIg1w0411N66tdet6HPdsHIQFyXWrb2WikyGqmunjAYHEbH3xUURfAV+ErGIorU9dewaxD6VkLCYvoh+Uj5iYT59ibw3RxJHB618dKGmb30waXNzHdTTfSGO6EKeovVdFJ4fruFfwyLwyUED8NnAn30KDmw9lDNFQW8m9qUyQ9y6jtjZ0+SNnazNbmPjtf0Ty/f52s/Y5+kzfUDBqFjK0IXpNaRuYdZnTSCWC5Qo8v10tufnNq77Htj/vFbRI1bl4Lvirn6KurvqbB5agl5tY8Ixizc3++g4iYn3qyo95/m3D+17NJnBnwLub9mqBpq7AlzsLMQc97r5pertIWfyfFVVzJ5eujS9fWjvW7hrHLT+Yiji5OyNvSoBTjTh2+2NCDdzwGCqIWqRyn0n9GhcMZ0tjQti78zVFGYmvphOYqJBxdP0w0V58rIAGaVQK2aybeZitaC180TDi/vmR4496abFTxbm26lYyMb8WgZosoFOEgd+lCnBFgeGURciUoGyGjAVjpcXMYmL5BqjYiD1YM1sjhTYkUYmEiWjwieG/zzws6ZfFvq/Pfo3Ltge488BKg6BTdxI43dEnq/IzWqaTwcU4LcGWC/NDcvQudfSdOlUKraGp6nvmzPEAVJnMaiIVIb0KwqopqPaLRnWFkFUvvu9ePwvOx9eNhfLonyIM/ZP5rJ+CY2YMt3x+BUn5yFSG9YNk0+SvHpjjE1FLikkCFXEOxm/E4kV6lVoyjCc8ijePrbi57exF7YvIn3uEa4YczKCRFqQjMyFGoKnspUzng7ApyNyOkHSefzmumZTX6CWdCM4PEzvgPglxvgNBErAuq/BtHv/PbijeFXfB48914+rFe1CqfUyd1gSGGTBGbAhTK8BiEH/HOYUKetIdX4Pf3SM4H9zGPTthULXCtb8PdbcPfTSjsst1YNHn91awOPL/Y8e+75w+I/wu+ZSK4LYxEEhOankNSbOSCSmQmUTI0KwqvuNNm9/OPTSwE8/0RfW4d9tf5opvUUr/dfq2tyYWHuKUnkEURtZjdZ8MmGSJMyrMxFJR1KI00jcXaRUEUz6IpJS30rgltVgdRt6rt98sPj6jgeH+sAWP4CGvgZA7Qzmd3ERMlGs63xQCmUjnLk2OghXmxkMeQF088zo/oGJ6/KVv9zu+u7hlLsgHsBmu0E19yIy75x6s23NxTMpx/Cgk1F601cKJrFOAv0IxryqPH1k/JefD1rd6/8CDAB0iopfkvGkEQAAAABJRU5ErkJggg=="
                    alt="date"
                  />
                </span>
                <span className={styles.Type}>Date</span>
                <Select defaultValue={"Date"} className={styles.Select}>
                  <Option disabled selected>
                    Choose Date
                  </Option>
                </Select>
              </div>
              <div
                className={`${styles.Col_Lg_3} ${styles.Col_Sm_6} ${styles.Col_Md_6}`}
              >
                <span>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA9NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YWFmZDM1NzktMWZiMS02YjQxLTlkZDgtOTViMmM2MTJkOThiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUyNTFCODRBMjRENTExRUFCNzQ0QjlEODNFM0Y5OUE2IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUyNTFCODQ5MjRENTExRUFCNzQ0QjlEODNFM0Y5OUE2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg3N2FhZmJmLTQ4YzEtMDc0Zi1iYzhj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"
                    alt="hour"
                  />
                </span>
                <span className={styles.Type}>Hour</span>
                <Select defaultValue={"Hour"} className={styles.Select}>
                  <Option disabled selected>
                    Choose Hour
                  </Option>
                </Select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
