package com.adil.server.service.impl;

import com.adil.server.dto.OrderDTO;
import com.adil.server.entity.Order;
import com.adil.server.mapper.OrderMapperr;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.Stripe;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@AllArgsConstructor
@Service
public class PaymentService {
    private final OrderMapperr orderMapper;
    private final String API_KEY = "sk_test_51P1FhtKUGlAStujytHclw7d16QSj8uQ1cb9dlmd7yEBJiFbm3uA3TAqeox8ZkcXJAWiPATiUdxqAjr7Q9o7miT5D00RexeTbFF";

    public String createPayment(OrderDTO orderDTO) throws StripeException {
        // Set the Stripe API key
        Stripe.apiKey = API_KEY;
        Order order = orderMapper.toEntity(orderDTO);
        System.out.println(order.getOrderDetails());
        ;
        // Calculate the total amount in cents
        BigDecimal totalAmountCents = BigDecimal.valueOf(updateTotalAmount(order)*100)
                .setScale(0, RoundingMode.HALF_UP);
        System.out.println(totalAmountCents);

        // Create a payment session by adding the payment session details
        SessionCreateParams.Builder paramsBuilder =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:5173/confirmation")
                        .setCancelUrl("http://localhost:5173");

        // Add line item with price data including product_data
        paramsBuilder.addLineItem(
                SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency("eur")
                                        .setUnitAmountDecimal(totalAmountCents)
                                        .setProductData(
                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                        .setName("Order #" + order.getId())
                                                        .build())
                                        .build())
                        .build());

        // Create the session
        Session session = Session.create(paramsBuilder.build());

        return session.getUrl();
    }


    private double updateTotalAmount(Order order) {
        return order.getOrderDetails().stream()
                .mapToDouble(orderDetail -> orderDetail.getQuantity() * orderDetail.getBook().getPrice())
                .sum();
    }
}

