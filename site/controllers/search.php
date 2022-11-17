<?php

return function ($site) {

  $query   = get('q');
  $results = $site->find('reviews')->search($query, 'title|text');
//  $results = $results->paginate(20);

  return [
    'query'   => $query,
    'results' => $results,
//    'pagination' => $results->pagination()
  ];

};
