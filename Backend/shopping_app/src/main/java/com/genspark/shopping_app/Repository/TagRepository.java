package com.genspark.shopping_app.Repository;

import com.genspark.shopping_app.Entity.Item;
import com.genspark.shopping_app.Entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//repo for tags

@Repository
public interface TagRepository extends JpaRepository<Tag,Integer> {
    @Query(value = "SELECT tbl_items.itemid FROM tbl_items WHERE tbl_items.itemid IN (SELECT tbl_items.itemid FROM tbl_items INNER JOIN tbl_tags ON tbl_tags.tag = :tag AND tbl_tags.item = tbl_items.itemid)", nativeQuery = true)
    List<Integer> findItemsByTag(@Param("tag") String tag);
}
