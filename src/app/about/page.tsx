'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination } from 'swiper/modules';
import ButtonLink from '@/components/ui/ButtonLink';

const Page = () => {
  const list = [
    {
      title: 'Global Reach and Redundancy:',
      text: 'Cloud storage websites operate on a global scale, with data centers strategically located around the world. This geographic diversity ensures redundancy and high availability, even in the face of regional disasters or outages.',
    },
    {
      title: 'Scalability to Suit Your Needs:',
      text: 'As your storage needs grow, cloud storage websites offer scalable solutions. You can easily upgrade your storage plan to accommodate larger volumes of data without the need for hardware upgrades or additional physical space.',
    },
    {
      title: 'Cost-Effective Storage Solutions:',
      text: 'Cloud storage websites offer a cost-effective solution to your storage needs. You can choose from a variety of plans that suit your budget and requirements. You can also opt for pay-as-you-go plans that allow you to pay only for the storage you use.',
    },
  ];
  const [progress, setProgress] = useState(0);

  const handleProgress = (swiper: any) => {
    setProgress((swiper.realIndex / (swiper.slides.length - 1)) * 100);
  };

  const easingTransitions = {
    entering: {
      top: 0,
      translateX: 0,
      opacity: 1,
    },
    exiting: {
      top: -500,
      translateX: 320,
      opacity: 0,
    },
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl text-sky-600 mb-8">About Clouds Inc</h1>
            <div className="max-w-2xl w-full my-4 mb-20">
              <p className="mb-5">
                In today's digital age, the need for efficient and reliable data storage solutions has never been
                greater.
              </p>
              <p>
                Enter the world of cloud storage websites, where your data finds a safe and accessible home in the
                virtual realm. These platforms have revolutionized the way we manage, share, and safeguard our digital
                lives.
              </p>
            </div>
            <ul className="list-disc">
              {list.map(({ title, text }, index) => (
                <li className="ml-4 mt-7" key={index.toString()}>
                  <h2 className="text-xl text-sky-500 mb-4">{title}</h2>
                  <p className="mb-5">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* add swiper slider */}
          <div className={'max-w-3xl w-full h-auto flex flex-col items-between justify-between'}>
            <Swiper
              speed={1500}
              autoplay={{ delay: 5550 }}
              onProgress={handleProgress}
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              slidesPerGroup={1}
              onSlideChange={() => console.log('slide change')}
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              <SwiperSlide>
                {({ isActive }) => (
                  <motion.div
                    className="max-w-[58rem] flex-col flex w-full h-[36rem] overflow-hidden rounded-xl"
                    initial={easingTransitions.exiting}
                    animate={isActive ? easingTransitions.entering : easingTransitions.exiting}
                    transition={{ type: 'spring', duration: 0.5 }}
                  >
                    <motion.img
                      initial={{ opacity: 0, zIndex: 999, scale: 0.67 }}
                      animate={
                        isActive
                          ? { opacity: 1, zIndex: 999, filter: 'none', scale: 1 }
                          : {
                              opacity: 0,
                              filter: 'blur(12px)',
                              scale: 0.67,
                              zIndex: 999,
                            }
                      }
                      transition={{ duration: 0.777, delay: 0.5 }}
                      src="/images/about.avif"
                      alt="about"
                      className="overflow-hidden rounded-xl"
                    />
                    <motion.p
                      // initial={{ opacity: 0, overflow: 'hidden', y: -60, x: -120 }}
                      animate={
                        isActive
                          ? { opacity: 1, visibility: 'visible', overflow: 'visible', y: 0, x: 0 }
                          : {
                              overflow: 'hidden',
                              opacity: 0,
                              visibility: 'hidden',
                              x: 0,
                              y: 66,
                            }
                      }
                      transition={{ type: 'spring', duration: 0.595, delay: 0.666 }}
                      className="mt-4 text-black"
                    >
                      Server room with racks of servers in a data center 2
                    </motion.p>
                  </motion.div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                {({ isActive }) => (
                  <motion.div
                    className="max-w-[58rem] flex-col flex  w-full h-[36rem] overflow-hidden rounded-xl"
                    initial={easingTransitions.exiting}
                    animate={isActive ? easingTransitions.entering : easingTransitions.exiting}
                    transition={{ type: 'spring', duration: 0.5 }}
                  >
                    <motion.img
                      initial={{ opacity: 0, zIndex: 999, scale: 0.67 }}
                      animate={
                        isActive
                          ? { opacity: 1, zIndex: 999, filter: 'none', scale: 1 }
                          : {
                              opacity: 0,
                              filter: 'blur(12px)',
                              scale: 0.67,
                              zIndex: 999,
                            }
                      }
                      transition={{ duration: 0.777, delay: 0.5 }}
                      src="/images/about.avif"
                      alt="about"
                      className="overflow-hidden rounded-xl"
                    />
                    <motion.p
                      // initial={{ opacity: 0, overflow: 'hidden', y: -60, x: -120 }}
                      animate={
                        isActive
                          ? { opacity: 1, visibility: 'visible', overflow: 'visible', y: 0, x: 0 }
                          : {
                              overflow: 'hidden',
                              opacity: 0,
                              visibility: 'hidden',
                              x: 0,
                              y: 66,
                            }
                      }
                      transition={{ type: 'spring', duration: 0.595, delay: 0.666 }}
                      className="mt-4 text-black"
                    >
                      Server room with racks of servers in a data center 2
                    </motion.p>
                  </motion.div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                {({ isActive }) => (
                  <motion.div
                    className="max-w-[58rem] flex-col flex  w-full h-[36rem] overflow-hidden rounded-xl"
                    initial={easingTransitions.exiting}
                    animate={isActive ? easingTransitions.entering : easingTransitions.exiting}
                    transition={{ type: 'spring', duration: 0.5 }}
                  >
                    <motion.img
                      initial={{ opacity: 0, zIndex: 999, scale: 0.67 }}
                      animate={
                        isActive
                          ? { opacity: 1, zIndex: 999, filter: 'none', scale: 1 }
                          : {
                              opacity: 0,
                              filter: 'blur(12px)',
                              scale: 0.67,
                              zIndex: 999,
                            }
                      }
                      transition={{ duration: 0.777, delay: 0.5 }}
                      src="/images/about.avif"
                      alt="about"
                      className="overflow-hidden rounded-xl"
                    />
                    <motion.p
                      // initial={{ opacity: 0, overflow: 'hidden', y: -60, x: -120 }}
                      animate={
                        isActive
                          ? { opacity: 1, visibility: 'visible', overflow: 'visible', y: 0, x: 0 }
                          : {
                              overflow: 'hidden',
                              opacity: 0,
                              visibility: 'hidden',
                              x: 0,
                              y: 66,
                            }
                      }
                      transition={{ type: 'spring', duration: 0.595, delay: 0.666 }}
                      className="mt-4 text-black"
                    >
                      Server room with racks of servers in a data center 2
                    </motion.p>
                  </motion.div>
                )}
              </SwiperSlide>
            </Swiper>
            <div className="mt-auto p-3.5 w-full">
              <p className={'mb-6'}>Give your data for Clouds, Inc. We will keep it safe for you.</p>
              <ButtonLink text={'Join Us'} path={'/profile'} classes={' w-full'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
