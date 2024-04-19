import React, { useEffect, useState } from "react";
import { UilMultiply } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import ComponentActions from "../store/actions/component-actions";
const BreadCrumbs = () => {
  let breadcrumblist = useSelector((state) => {
    return state.component.breadcrumb;
  });


  console.log(breadcrumblist,"breadcrumblistbreadcrumblist")

  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  return (
    <div>
      <nav class="bg-violet-50 p-2">
        <ol class="list-reset flex text-gray-600">
          {breadcrumblist.filter(item=>item.name!="").map((item, index) => {
            return (
              <>
                {index != breadcrumblist.length - 1 ? (
                  <>
                    <li>
                      <a
                        class="text-green-500 hover:text-green-600"
                        onClick={() => {
                          dispatch(
                            ComponentActions.breadcrumb(
                              "",
                              "",
                              item.index,
                              false
                            )
                          );
                          navigate(item.link);
                        }}
                      >
                        {item.name}
                      </a>
                    </li>
                    <li class="mx-2">/</li>
                  </>
                ) : (
                  <>
                    <li class="text-gray-700 font-semibold">{item.name}</li>
                  </>
                )}
              </>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
