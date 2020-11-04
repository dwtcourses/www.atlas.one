import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-scroll"
import { Link as GatsbyLink } from "gatsby"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai"
import LogoWhite from "./../../images/logo.png"
import LogoBlack from "../../images/black-blue.png"
import AnnoucementIcon from "../../images/annoucement-icon.png"
import "./navbar.scss"

export default function Header({ isTransparentHeader=false }) {
  const navLinks = [
    {
      name: "Case Studies",
      path: "case-studies",
    },
    {
      name: "Benefits",
      path: "benifits",
    },
    {
      name: "Solutions",
      path: "solutions",
    },
    {
      name: "Industries",
      path: "industries",
    },
    {
      name: "Pricing",
      path: "pricing",
    },
    {
      name: "Resources",
      path: "resources",
    },
    {
      name: "Contact Us",
      path: "contact-us",
    },
  ]
  const nav = useRef(null)
  const [isExpanded, toggleExpansion] = useState(false)
  const [currentLogo, setLogo] = useState(LogoWhite)
  const [isOffset, setIsOffset] = useState(false)
  const [width, setWidth] = useState(1440)

  useEffect(() => {
    if (!isTransparentHeader) {
      if (nav && nav.current) {
        nav.current.classList.add("active")
        setLogo(LogoBlack)
      }
    }

    if (typeof window != "undefined") {
      const handleWindowResize = () => setWidth(window.innerWidth)

      window.addEventListener("resize", handleWindowResize())

      window.addEventListener("scroll", function () {
        if (nav && nav.current) {
          if (window.pageYOffset > 0) {
            setIsOffset(true)
            nav.current.classList.add("active")
            setLogo(LogoBlack)
          } else {
            //remove the background property so it comes transparent again (defined in your css)
            setIsOffset(false)
            nav.current.classList.remove("active")
            setLogo(LogoWhite)
          }
        }

        if (!isTransparentHeader) {
          if (nav && nav.current) {
            nav.current.classList.add("active")
            setLogo(LogoBlack)
          }
        }
      })

      return () => window.removeEventListener("resize", handleWindowResize)
    }    
  /* eslint-disable-next-line */
  }, [])

  const checkOffset = () => {
    if (typeof window != "undefined") {
      if (window.pageYOffset > 0) {
        setIsOffset(true)
        setLogo(LogoBlack)
      } else {
        setIsOffset(false)
        setLogo(LogoWhite)
      }
    }

    if (!isTransparentHeader) {
      if (nav && nav.current) {
        nav.current.classList.add("active")
        setLogo(LogoBlack)
      }
    }
  }

  return (
    <React.Fragment>
      <div className="w-full hidden lg:flex h-auto py-3 bg-lightblue text-white font-medium items-center justify-center">
        <div className="flex items-center">
          <img src={AnnoucementIcon} alt="Annoucement Icon" />
          <span className="ml-2 text-white">
            Keep the community informed of nearby public safety alerts.
          </span>
        </div>
        <button className="mx-1">Book a demo today!</button>
      </div>
      <nav
        ref={nav}
        className={`flex nav items-center justify-between absolute w-full z-30 flex-wrap px-0 py-5 lg:px-10 border-b border-gray-700 ${
          isExpanded ? "expanded" : ""
        } ${isOffset ? "active" : ""}`}
      >
        <GatsbyLink
          className="flex items-center flex-shrink-0 text-white mr-6 pl-3 lg:pl-0 cursor-pointer"
          to="/"
        >
          <img src={currentLogo} alt="Altas Logo" />
        </GatsbyLink>
        <div className="block lg:hidden">
          {!isExpanded ? (
            <button
              onClick={() => {
                toggleExpansion(!isExpanded)
                setLogo(LogoBlack)
              }}
              className="flex items-center pr-6 py-2 border rounded border-none outline-none hover:text-white hover:border-white focus:outline-none"
            >
              <GiHamburgerMenu
                size={24}
                fill={currentLogo === LogoBlack ? "#000000" : "#ffffff"}
              />
            </button>
          ) : (
            <button
              onClick={() => {
                toggleExpansion(!isExpanded)
                checkOffset()
              }}
              className="flex items-center pr-6 py-2 border rounded border-none outline-none hover:text-white hover:border-white focus:outline-none"
            >
              <AiOutlineClose
                size={24}
                fill={`${currentLogo === LogoBlack ? "#000000" : "#ffffff"}`}
              />
            </button>
          )}
        </div>
        <div
          className={`${
            isExpanded ? `block` : `hidden`
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto p-5 lg:p-0`}
        >
          <div className="lg:inline-flex border-t py-4 lg:py-0 lg:border-0 mt-2 lg:mt-0 lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-1 justify-center flex-col lg:h-auto">
            {navLinks.map((item, i) => (
              <Link
                to={item.path}
                key={i}
                spy={true}
                smooth={true}
                duration={100}
                hashSpy={true}
                offset={width > 767 ? -100 : -50}
                activeClass="activeLink"
                className="lg:inline-flex cursor-pointer lg:w-auto w-full font-600 px-3 py-2 rounded items-center justify-center"
              >
                {/* eslint-disable-next-line */}
                <span onClick={() => toggleExpansion(false)}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          <div>
            <button className="blue-button text-white font-medium lg:mx-0 w-full lg:w-auto py-3 px-6 mt-8 lg:mt-0">
              Book a demo
            </button>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}
