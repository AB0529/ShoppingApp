package com.genspark.shopping_app.Repository;

import com.genspark.shopping_app.Entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//repo for items
@Repository
public interface ItemRepository extends JpaRepository<Item,Integer> {
    @Query(value = "SELECT * FROM tbl_items WHERE tbl_items.name LIKE concat('%', :name, '%')", nativeQuery = true)
    List<Integer> findItemsByName(@Param("name") String name);
}
