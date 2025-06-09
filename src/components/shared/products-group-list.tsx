'use client'
import React, {FC, useEffect, useRef} from 'react';
import { useIntersection } from 'react-use';
import { Title } from './title';
import { ProductCard } from './product-card';
import {useCategoryStore} from "@/store/catedory";

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
}

export const ProductsGroupList: FC<Props> = ({ title, items, categoryId, className }) => {
    const {setActiveId} = useCategoryStore();


    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
           setActiveId(categoryId)
        }
    }, [categoryId, intersection?.isIntersecting, setActiveId, title])

  return (
    <div className={className} id={title} ref={intersectionRef}>
        <Title text={title} size="lg" className="font-extrabold mb-5" />

        <div>
            <div className="grid grid-cols-3 gap-[50px]">
                {items.map((item, i) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        name="Маргарита"
                        imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
                        price={item.items[0].price}
                    />
                ))}
            </div>
        </div>
    </div>
  );
};
