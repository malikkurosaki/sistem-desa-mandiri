'use client'
import { TEMA } from '@/module/_global';
import { funGetAllBanner, IDataBanner } from '@/module/banner';
import { funGetHome } from '@/module/home';
import { useHookstate } from '@hookstate/core';
import { Carousel } from '@mantine/carousel';
import { Flex, Image, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
export default function CarouselDivision() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const tema = useHookstate(TEMA)
  const [isDesa, setDesa] = useState("")
  const [isData, setData] = useState<IDataBanner[]>([])


  const fetchData = async () => {
    try {
      const res_banner = await funGetAllBanner()
      if (res_banner.success) {
        setData(res_banner.data)
      } else {
        toast.error(res_banner.message);
      }
      const response = await funGetHome('?cat=header')
      if (response.success) {
        setDesa(response.data.village)
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Gagal mendapatkan data, coba lagi nanti");
      console.error(error);
    }
  };


  useShallowEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Carousel
        withIndicators
        height={150}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {
          isData.length > 0 ?
            isData.map((item, index) => (
              <Carousel.Slide key={index} bg={tema.get().utama} style={{ borderRadius: 10 }}>
                <Image alt={item.title} h={"100%"} style={{ borderRadius: 10 }} src={`https://wibu-storage.wibudev.com/api/files/${item.image}`} />
              </Carousel.Slide>
            ))
            :
            [...Array(3)].map((_, index) => (
              <Carousel.Slide key={index} bg={tema.get().utama} style={{ borderRadius: 10 }}>
                <Flex justify={'center'} h={"100%"} align={'center'}>
                  <Text c={"white"}>INFORMASI {isDesa.toUpperCase()}</Text>
                </Flex>
              </Carousel.Slide>
            ))
        }
      </Carousel>
    </>
  );
}

