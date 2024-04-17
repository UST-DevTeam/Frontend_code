import React, { useEffect, useState } from "react";
import { UilMultiply } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
const BreadCrumbs = () => {
  let breadcrumblist = useSelector((state) => {
    return state.component.breadcrumb;
  });

  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  return (
    <div>
      <nav class="bg-gray-100 p-4">
        <ol class="list-reset flex text-gray-600">
          {breadcrumblist.map((item, index) => {
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
                              itm[0],
                              itm[2],
                              1,
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
