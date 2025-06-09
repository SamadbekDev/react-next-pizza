import React from "react";
import {CheckboxFiltersGroup, FilterCheckbox, Title} from "@/components/shared";
import {Input} from "@/components/ui";
import {RangeSlider} from "@/components/shared/range-slider";



interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className}) => {
    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

            {/*Верхний чекбокс*/}
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1"/>
                <FilterCheckbox text="Новинки" value="2"/>
            </div>

            {/*Фильтер цен*/}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Цена от и до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input type='number' placeholder='0' min={0} max={100000} defaultValue={0}/>
                    <Input type='number' placeholder='100000' min={10000} max={100000}/>
                </div>

                <RangeSlider  min={0} max={100000} step={10} value={[0, 100000]}/>
            </div>

            <CheckboxFiltersGroup
                title='Ингредиенты'
                className='mt-5'
                limit={6}
                defaultItems={[
                    {
                        text: 'Сырный соус',
                        value: '1',
                    },
                    {
                        text: 'Моццарелла',
                        value: '2',
                    },
                    {
                        text: 'Чеснок',
                        value: '3',
                    },
                    {
                        text: 'Солённые огурчики',
                        value: '4',
                    },
                    {
                        text: 'Красный лук',
                        value: '5',
                    },
                    {
                        text: 'Томаты',
                        value: '6',
                    },
                    {
                        text: 'Грибы',
                        value: '7',
                    },
                    {
                        text: 'Ветчина',
                        value: '8',
                    },
                    {
                        text: 'Пепперони',
                        value: '9',
                    },
                    {
                        text: 'Бекон',
                        value: '10',
                    },
                    {
                        text: 'Курица',
                        value: '11',
                    },
                    {
                        text: 'Халапеньо',
                        value: '12',
                    },
                    {
                        text: 'Маслины',
                        value: '13',
                    },
                    {
                        text: 'Ананасы',
                        value: '14',
                    },
                    {
                        text: 'Пармезан',
                        value: '15',
                    },
                ]}
                items={[
                    {
                        text: 'Сырный соус',
                        value: '1',
                    },
                    {
                        text: 'Моццарелла',
                        value: '2',
                    },
                    {
                        text: 'Чеснок',
                        value: '3',
                    },
                    {
                        text: 'Солённые огурчики',
                        value: '4',
                    },
                    {
                        text: 'Красный лук',
                        value: '5',
                    },
                    {
                        text: 'Томаты',
                        value: '6',
                    },
                    {
                        text: 'Грибы',
                        value: '7',
                    },
                    {
                        text: 'Ветчина',
                        value: '8',
                    },
                    {
                        text: 'Пепперони',
                        value: '9',
                    },
                    {
                        text: 'Бекон',
                        value: '10',
                    },
                    {
                        text: 'Курица',
                        value: '11',
                    },
                    {
                        text: 'Халапеньо',
                        value: '12',
                    },
                    {
                        text: 'Маслины',
                        value: '13',
                    },
                    {
                        text: 'Ананасы',
                        value: '14',
                    },
                    {
                        text: 'Пармезан',
                        value: '15',
                    },
                ]}
            />
        </div>
    )
}