package com.genspark.shopping_app.Repository;

import com.genspark.shopping_app.Entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//repo for tags

@Repository
public interface TagRepository extends JpaRepository<Tag,Integer> {
}
