package com.genspark.shopping_app.Service.Imp;

import com.genspark.shopping_app.Repository.ItemRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(value = "/applicationContext.xml")
@AutoConfigureMockMvc
class PopulateServiceImplTest
{
//    @Autowired
//    public ItemServiceImp itemServiceImp;

    @Autowired
    private PopulateServiceImpl populateService;

    @Test
    public void TestPopulateServiceImpl()
    {
        this.populateService.populateDatabase();
    }
}