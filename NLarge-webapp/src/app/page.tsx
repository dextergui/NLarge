"use client";

import { Documentation } from "@/components/documentation";
import {
  AppShellMain,
  AppShellSection,
  Box,
  Button,
  Divider,
  Group,
  rem,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { IconListSearch } from "@tabler/icons-react";
import clsx from "clsx";
import classes from "@/components/TableOfContents.module.css";
import React, { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";

const tableOfContents = [
  {
    label: "Data Augmentation for Natural Language Processing",
    link: "#data-augmentation",
    order: 1,
  },
  { label: "Why does it matter?", link: "#why-does-it-matter", order: 1 },
  { label: "Introducing NLarge", link: "#intro-NLarge", order: 1 },
  { label: "Types of data augmentation", link: "#types-of-data-aug", order: 1 },
  { label: "Random Augmentation", link: "#aug-1", order: 2 },
  { label: "Synonym Augmentation", link: "#aug-2", order: 2 },
  { label: "LLM Augmentation", link: "#aug-3", order: 2 },
  { label: "Results and Findings", link: "#results", order: 1 },
];

export default function Home() {
  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const isDark = colorScheme === "dark";
  const [active, setActive] = React.useState(0);
  const sectionsRefs = React.useRef<HTMLDivElement[]>([]);

  const handleClick = (index: number, link: string) => {
    setActive(index);
    const targetElement = document.querySelector(link);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 300, // Adjust scroll position with -80px offset for the header
        behavior: "smooth",
      });
    }
  };

  // Add observer to detect section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRefs.current.findIndex(
              (section) => section === entry.target,
            );
            if (index !== -1) {
              setActive(index); // Update active state when section is visible
            }
          }
        });
      },
      { rootMargin: "0px 0px -50% 0px", threshold: 0.1 }, // Trigger when 10% of the section is in view
    );

    // Observe all sections
    sectionsRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const items = tableOfContents.map((item, index) => (
    <Box<"a">
      component="a"
      href={item.link}
      onClick={(event) => {
        event.preventDefault();
        handleClick(index, item.link);
      }}
      key={item.label}
      className={clsx(classes.link, { [classes.linkActive]: active === index })}
      style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }}
    >
      {item.label}
    </Box>
  ));

  return (
    <>
      <AppShellMain className="px-4 md:px-24 min-h-[90vh] md:max-h-[95vh] flex flex-col justify-between overflow-x-hidden">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start">
          <Box className="max-w-4xl w-full pt-md text-center md:text-left flex flex-col items-center md:items-start">
            <Title className="text-center md:text-left mt-8 md:mt-16">
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: "tertiary1", to: "tertiary2" }}
              >
                NLarge
              </Text>
              <Text inherit c="primary" ff="monospace">
                A dataset augmentation tool for your Natural Language models.
              </Text>
            </Title>
            <Text
              className="max-w-[500px] mt-xl"
              ff="monospace"
              c="dimmed"
              ta={{ base: "center", md: "left" }}
              size="md"
              maw={780}
              mt="xl"
            >
              This application is designed to solve the challenge of small
              natural language datasets. It automatically augments your data
              with proven methods to improve your model. To get started,
            </Text>

            <div className="mt-10 gap-5 text-center md:text-left">
              <Link href="/documentation">
                <Button
                  className="transform transition-transform duration-300 hover:scale-110"
                  variant="gradient"
                  size="xl"
                  gradient={{ from: "tertiary1", to: "tertiary2", deg: 152 }}
                >
                  Read our Documentation
                </Button>
              </Link>
            </div>
          </Box>
          <Box className="pt-10 md:pt-44 pr-0 md:pr-14 flex justify-center w-full md:w-auto">
            <div className="w-full max-w-[300px] md:max-w-[550px]">
              <Logo
                width="100%"
                height="100%"
                stroke="4"
                color={isDark ? "#D0BCFF" : "#7363AD"}
              />
            </div>
          </Box>
        </div>
        <Stack pb="sm" align="center" justify="center" gap="xs" c="primary">
          <Text ff="monospace" c="primary">
            Read more about NLarge
          </Text>
          <ArrowDownIcon />
        </Stack>
      </AppShellMain>
      <AppShellSection bg="bg2" className="px-4 md:px-24 py-8">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <Box className="w-full md:w-[65%]">
            <Documentation sectionsRefs={sectionsRefs} />
          </Box>
          <div className={clsx(classes.root, "hidden md:block")}>
            <Group mb="md">
              <IconListSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
              <Text>Table of contents</Text>
            </Group>
            <div className={classes.links}>
              <div
                className={classes.indicator}
                style={{
                  transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))`,
                }}
              />
              {items}
            </div>
          </div>
        </div>
      </AppShellSection>
      <AppShellSection>
        <Divider mb="sm" />
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-4 space-y-4 md:space-y-0 text-center md:text-left">
          <Text ff="monospace" c="dimmed" size="sm">
            © 2024 NLarge. All rights reserved
          </Text>
          <Text ff="monospace" c="dimmed" size="sm">
            Created as part of Nanyang Technological University: SC4001 Neural
            Network & Deep Learning
          </Text>
        </div>
      </AppShellSection>
    </>
  );
}
