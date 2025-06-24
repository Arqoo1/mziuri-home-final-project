import { useTranslation } from 'react-i18next';



const TopFilter = ({
  sort,
  setSort,
  isSelectOpen,
  setIsSelectOpen,
  productClassName,
  setProductClassName,
}) => {
  const handleSelectClick = () => {
    setIsSelectOpen(!isSelectOpen);
  };
  const { t } = useTranslation();
  const isSecondView = productClassName === 'product-in-list';

  return (
    <div className="top-filter">
      <div className="icon-group">
        <i
          className={`fas fa-th-list ${!isSecondView ? 'active' : ''}`}
          onClick={() => setProductClassName('')}
        ></i>
        <i
          className={`fas fa-th ${isSecondView ? 'active' : ''}`}
          onClick={() => setProductClassName('product-in-list')}
        ></i>
      </div>

      <div className="sort-container">
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          onClick={handleSelectClick}
        >
<option value="price_asc">{t("price_low_to_high")}</option>
<option value="price_desc">{t("price_high_to_low")}</option>
<option value="alphabetical_asc">{t("name_a_to_z")}</option>
<option value="alphabetical_desc">{t("name_z_to_a")}</option>
<option value="rating_desc">{t("rating_high_to_low")}</option>
<option value="rating_asc">{t("rating_low_to_high")}</option>

        </select>
        <div className={`select-arrow ${isSelectOpen ? 'rotate' : ''}`}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </div>
  );
};

export default TopFilter;
