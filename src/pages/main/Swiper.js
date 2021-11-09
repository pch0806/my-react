import React, { useState, useCallback, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import styled from 'styled-components';
import { push } from 'connected-react-router';
import { Swiper, SwiperSlide } from 'swiper/react';

// import { categorySelector } from '../../modules/categorySlice';
// import { goodsSelector } from '../../modules/goodsSlice';

// import MainCategory from './MainCategory';
// import MainFoodCourtGoods from './MainFoodCourtGoods';

const SwiperTest = () => {
  // const categoryList = useSelector(categorySelector.mobileCategoryList);
  // const goodsList = useSelector(goodsSelector.cafeGoodsList);
  const categoryList = [];
  const goodsList = [];

  const [selectedCategoryId, setSelectedCategoryId] = useState(sessionStorage.getItem('selectedCategoryId') || '');

  const swiperRef = useRef();
  const categoryListRef = useRef();

  const selectCategory = useCallback(categoryId => {
    sessionStorage.setItem('selectedCategoryId', categoryId);
    setSelectedCategoryId(categoryId);
  }, []);

  const moveScrollOfNavigation = useCallback(index => {
    let containerWidth = categoryListRef?.current?.offsetWidth;
    let offsetLeft = categoryListRef?.current?.children[index]?.offsetLeft;
    let offsetWidth = categoryListRef?.current?.children[index]?.offsetWidth;

    categoryListRef?.current?.scrollTo({
      left: offsetLeft - (containerWidth - offsetWidth) / 2,
      behavior: 'smooth',
    });
  }, []);

  const categorySwipe = useCallback(
    index => {
      const nextOrPrevCategoryId = categoryList[index]?.categoryId;

      if (nextOrPrevCategoryId) {
        selectCategory(nextOrPrevCategoryId);
        moveScrollOfNavigation(index);
      }
    },
//    [selectCategory, moveScrollOfNavigation, categoryList],
    [moveScrollOfNavigation,selectCategory,categoryList],
  );

  return (
    <Container>
      {categoryList.length > 0 ? (
        <>
          <div className="category-list" ref={categoryListRef}>
            <div className="category-empty"></div>
            {categoryList?.map((category, index) => (
              <MainCategory
                key={`category-${index}`}
                isSelect={selectedCategoryId === category.categoryId}
                category={category}
                selectCategory={selectCategory}
              />
            ))}
            <div className="category-empty"></div>
          </div>
          <div className="goods-list">
            <Swiper
              ref={swiperRef}
              onSlideChange={swiper => categorySwipe(swiper.activeIndex)}
              followFinger={false}
              shortSwipes={false}
              longSwipesMs={100}
              longSwipesRatio={0.1}
            >
              {categoryList?.map((category, index) => (
                <SwiperSlide key={`swipe-${index}`}>
                  {goodsList.length > 0 ? (
                    goodsList
                      .filter(goods => goods?.displayYn === 'Y' && goods.categoryId === selectedCategoryId)
                      .map((goods, index) => <MainFoodCourtGoods key={`goods-${index}`} goods={goods} />)
                  ) : (
                    <div className="no-goods">상품 없음</div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <div className="no-category">카테고리 없음</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  margin-top: 1.5625rem;

  .category-list {
    background: inherit;
    .category-empty {
      visibility: hidden;
      min-width: 0.9375rem;
      height: 100%;
    }
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 3.6875rem;
    background: inherit;
    overflow: overlay hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .goods-list {
    display: flex;
    position: relative;
    padding: 0.3125rem 0;
    background: inherit;

    .swiper-container {
      display: flex;
      width: 100%;
      height: 100%;
      background: inherit;

      .swiper-wrapper {
        display: flex;
        height: 100%;
        background: inherit;
        .swiper-slide {
          touch-action: pan-y; // swiper에서 터치슬라이드 동작X -> y축 이동만 터치로 인식하게함
        }
      }
    }
  }

  .no-goods {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 6.25rem 1.375rem 0;
    font-weight: 500;
    font-size: 0.9375rem;
    text-align: center;
    min-height: 21.25rem;
  }
  .no-category {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-weight: 500;
    font-size: 1.0625rem;
    text-align: center;
    min-height: 21.25rem;
  }
`;

const MainCategory = styled.div``;
const MainFoodCourtGoods = styled.div``;


export default React.memo(SwiperTest);