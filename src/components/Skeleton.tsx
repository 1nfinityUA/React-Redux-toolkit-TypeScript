import React from "react";
import ContentLoader from "react-content-loader";

// скелетон для відображення загрузочних скелетів блока, пока чекаємо відповіді від бек-енду
const Skeleton: React.FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="415" rx="10" ry="10" width="91" height="27" />
        <rect x="0" y="270" rx="10" ry="10" width="280" height="24" />
        <rect x="0" y="305" rx="10" ry="10" width="280" height="90" />
        <rect x="0" y="0" rx="20" ry="20" width="280" height="260" />
        <rect x="127" y="415" rx="30" ry="30" width="153" height="46" />
    </ContentLoader>
);

export default Skeleton;
